import React, { Component } from "react"
import { toast } from "react-toastify"
import qs from "qs"
import CKEditor from "ckeditor4-react"

import './module.css'
import axios from '../../axios'
import QuestionTypeIcon from '../../images/question-type.png'
import QuestionAddIcon from '../../images/question-add.png'
import QuestionRemoveIcon from '../../images/question-remove.png'
import QuestionDoesntExistIcon from '../../images/question-doesnt-exist.png'
import QuestionTypeModal from '../../components/QuestionTypeModal'
import QuestionEditorModal from '../../components/QuestionEditorModal'
import { editorToolbar } from '../../constants/editor'

const questionTypeLabels = {
  single: 'Pilihan Ganda',
  multi: 'Multi Jawaban',
  essay: 'Esai / Uraian',
  match: 'Pencocokan',
}

class Editor extends Component {
  state = {
    isLoading: false,
    isChanged: false,
    isShowQuestionTypeModal: false,
    isShowQuestionEditorModal: false,
    unusedTypes: [],
    questionsData: {
      exam_id: null,
      question_types: []
    },
    activeEditor: {}
  }

  componentDidMount = () => {
    this.loadQuestionsData()
  }

  loadQuestionsData = async () => {
    try {
      const params = qs.stringify({ exam_id: 297 })
      const res = await axios.post('/v2dev/exam/get-soal?' + params)

      const { data } = res.data
      const questionsData = {
        ...data,
        question_types: !data.question_types ? [] : data.question_types.map(type => ({
          ...type,
          optionCount: type.question_type !== 'essay' ? type.questions[0].options.length : 0
        }))
      }

      if (res.data.status) this.setState({ questionsData }, this.evaluateUnusedTypes)
      else throw res.data

    } catch (err) {
      toast(typeof err === 'string' ? err : err.hasOwnProperty('message') ? err.message : JSON.stringify(err))
    }
  }

  cacheQuestionsData = async (immediate) => {
    if (!this.state.isChanged && immediate !== true) return
    try {
      const payload = {
        ...this.state.questionsData,
        question_types: this.state.questionsData.question_types.map(type => ({
          ...type,
          questions: type.questions.map(question => ({
            ...question,
            options: !question.options ? [] : question.options.map(option => ({
              ...option,
              is_correct: option.is_correct ? 1 : 0
            }))
          }))
        }))
      }
      const params = qs.stringify(payload)
      const res = await axios.post('/v2dev/exam/save-soal?' + params + (params.includes('question_types') ? '' : '&question_types[]'))

      if (res.data.status === true) {
        const { data } = res.data
        const questionsData = {
          ...data,
          question_types: !data.question_types ? [] : data.question_types.map(type => ({
            ...type,
            optionCount: type.question_type !== 'essay' ? type.questions[0].options.length : null
          }))
        }

        this.setState({ isChanged: false, questionsData })
        toast('Autosaved successfully!')
      }
      else if (res.data.status === false) throw res.data.text
      // else throw Object.values(res.data).reduce((acc, curr) => acc + curr.join(', '), '')

    } catch (err) {
      toast(typeof err === 'string' ? err : err.hasOwnProperty('message') ? err.message : JSON.stringify(err))
    }
  }

  saveQuestionsData = async () => {
    try {
      const params = qs.stringify(this.state.questionsData)
      const res = await axios.post('/v2dev/exam/save-soal?' + params)

      if (res.data.status === true) {
        toast('Questions Uploaded Successfully!')
      }
      else if (res.data.status === false) throw res.data.text
      else throw Object.values(res.data).reduce((acc, curr) => acc + curr.join(', '), '')

    } catch (err) {
      toast(typeof err === 'string' ? err : err.hasOwnProperty('message') ? err.message : JSON.stringify(err))
    }
  }

  evaluateUnusedTypes = () => {
    this.setState(prevState => ({
      unusedTypes: Object.entries(questionTypeLabels)
        .filter(([value, label]) =>
          !prevState.questionsData.question_types.some(type =>
            type.question_type === value
          )
        )
        .reduce((acc, [value, label]) => {
          acc.push({ value, label })
          return acc
        }, [])
    }))
  }

  handleInput = (wrapperIndex, questionIndex) => updatedQuestion => {
    this.setState(prevState => {
      const question_types = [...prevState.questionsData.question_types]
      question_types[wrapperIndex].questions[questionIndex] = updatedQuestion
      return {
        isChanged: true,
        questionsData: {
          ...prevState.questionsData,
          question_types
        }
      }
    })
  }

  addQuestion = (wrapperIndex, questionIndex) => {
    this.setState(prevState => {
      const timestamp = Date.now()
      const question_types = [...prevState.questionsData.question_types]
      const { question_type, optionCount } = question_types[wrapperIndex]
      const newQuestion = {
        question_id: 'question-dummy-id-' + timestamp,
        question_text: '',
        ehq_order: null,
        options: question_type === 'essay' ? [] : [...Array(optionCount).keys()].map((optionIndex) => ({
          option_id: 'option-dummy-id-' + timestamp + optionIndex,
          option_text: '',
          is_correct: 0
        })),
        matches: question_type !== 'match' ? [] : [...Array(optionCount).keys()].map(() => ({
          option_match_text: '',
          match_with_option_id: null
        }))
      }

      question_types[wrapperIndex].questions.splice(questionIndex + 1, 0, newQuestion)

      return {
        questionsData: {
          ...prevState.questionsData,
          question_types
        }
      }
    })
  }

  removeQuestion = (wrapperIndex, questionIndex) => {
    if (!window.confirm('Apakah anda yakin?')) return
    this.setState(prevState => {
      const question_types = [...prevState.questionsData.question_types]
      question_types[wrapperIndex].questions.splice(questionIndex, 1)

      return {
        isChanged: true,
        questionsData: {
          ...prevState.questionsData,
          question_types
        }
      }
    }, () => {
      if (this.state.questionsData.question_types[wrapperIndex].questions.length === 0) {
        this.removeQuestionType(wrapperIndex)()
      } else {
        this.cacheQuestionsData(true)
      }
    })
  }

  handleAction = (wrapperIndex, questionIndex) => actionType => event => {
    switch (actionType) {
      case 'add': this.addQuestion(wrapperIndex, questionIndex); break;
      case 'remove': this.removeQuestion(wrapperIndex, questionIndex); break;
    }
  }

  toggleQuestionTypeModal = () => {
    this.setState(prevState => ({
      isShowQuestionTypeModal: !prevState.isShowQuestionTypeModal
    }))
  }

  toggleQuestionEditorModal = () => {
    this.setState(prevState => ({
      isShowQuestionEditorModal: !prevState.isShowQuestionEditorModal
    }))
  }

  addQuestionType = payload => {
    this.setState(prevState => {
      const clonedQuesitonsData = { ...prevState.questionsData }
      clonedQuesitonsData.question_types.push({
        question_type: payload.questionType,
        optionCount: parseInt(payload.optionCount),
        questions: []
      })
      return { questionsData: clonedQuesitonsData }
    }, () => {
      this.evaluateUnusedTypes()
      this.addQuestion(this.state.questionsData.question_types.length - 1, 0)
      window.scrollTo(0, document.body.scrollHeight)
    })
  }

  removeQuestionType = wrapperIndex => event => {
    this.setState(prevState => {
      const clonedQuesitonsData = { ...prevState.questionsData }
      clonedQuesitonsData.question_types.splice(wrapperIndex, 1)
      return { questionsData: clonedQuesitonsData }
    }, () => {
      this.evaluateUnusedTypes()
      this.cacheQuestionsData(true)
    })
  }

  activateEditor = questionData => () => {
    this.setState({ activeEditor: questionData }, this.toggleQuestionEditorModal)
  }

  handleEditorSubmit = editorResult => {
    this.setState(prevState => {
      const timestamp = Date.now()
      const question_types = [...prevState.questionsData.question_types]
      const { optionCount, question_type } = prevState.activeEditor
      const wrapperIndex = question_types.findIndex(type => type.question_type === question_type)

      const questions = editorResult.map((result, questionIndex) => ({
        question_id: 'question-dummy-id-' + timestamp + questionIndex,
        question_text: result.question,
        ehq_order: null,
        options: [...Array(optionCount).keys()].map(optionIndex => ({
          option_id: 'option-dummy-id-' + timestamp + optionIndex,
          option_text: result.options[optionIndex] || '',
          is_correct: 0
        }))
      }))

      question_types[wrapperIndex].questions = questions

      return {
        isChanged: true,
        isShowQuestionEditorModal: false,
        activeEditor: {},
        questionsData: {
          ...prevState.questionsData,
          question_types
        }
      }
    }, this.cacheQuestionsData)
  }

  renderQuestions = (questionType, questionData, wrapperIndex) => {
    const { question_types } = this.state.questionsData

    const componentMap = {
      single: QuestionSingle,
      multi: QuestionMulti,
      essay: QuestionEssay,
    }
    const QuestionComponent = componentMap[questionType]

    if (!QuestionComponent) return

    return questionData.questions.map((question, questionIndex) => {
      const orderNumber = (wrapperIndex === 0 ? 0 :
        question_types
          .slice(0, wrapperIndex)
          .reduce((acc, curr) => acc + curr.questions.length, 0)
      ) + questionIndex + 1

      return <QuestionComponent {...{
        key: wrapperIndex + '' + question.question_id,
        question,
        wrapperIndex,
        orderNumber,
        handleInput: this.handleInput(wrapperIndex, questionIndex),
        handleAction: this.handleAction(wrapperIndex, questionIndex),
        cacheQuestionsData: this.cacheQuestionsData,
      }} />
    })
  }

  render () {
    const { question_types } = this.state.questionsData
    return (
      <div id="soal-ujian" className="px-3 pt-3">

        <QuestionTypeModal
          isShow={this.state.isShowQuestionTypeModal}
          toggleModal={this.toggleQuestionTypeModal}
          availableTypes={this.state.unusedTypes}
          addQuestionType={this.addQuestionType}
        />

        <QuestionEditorModal
          key={this.state.activeEditor.question_type}
          isShow={this.state.isShowQuestionEditorModal}
          toggleModal={this.toggleQuestionEditorModal}
          editorData={this.state.activeEditor}
          onSubmit={this.handleEditorSubmit}
        />

        <header className="d-flex justify-content-between align-items-start">
          <div>
            <h4><b>Buat Soal Manual</b></h4>
            <p className="text-muted">Buat soal dan jawaban pada editor text</p>
          </div>
          <div className="d-flex justify-content-between">
            <button className="btn btn-success mr-2">+ Ambil Dari Bank Soal</button>
            <button className="btn btn-primary" onClick={this.toggleQuestionTypeModal}>+ Tambah Tipe Soal</button>
          </div>
        </header>

        {question_types.length
          ? question_types.map((questionData, wrapperIndex) => (
            <section className="section-wrapper mb-5" key={wrapperIndex}>
              <header className="d-flex align-items-center mt-3">
                <div><b>Tipe Soal</b></div>
                <div className="ml-5 question-type-badge d-flex justify-content-between align-items-center">
                  {questionTypeLabels[questionData.question_type]}
                  <img src={QuestionTypeIcon} alt="" />
                </div>
                {questionData.question_type !== 'essay' &&
                  <div className="ml-4 option-badge">{questionData.optionCount} Opsi</div>
                }
                <div className="ml-4 option-badge">Bobot Soal Manual</div>
                <button
                  className="ml-auto btn btn-success px-5 editor-button"
                  onClick={this.activateEditor(questionData)}
                >
                  <b>EDITOR</b>
                </button>
              </header>

              <section className="question-wrapper mt-4">
                {this.renderQuestions(questionData.question_type, questionData, wrapperIndex)}
              </section>
            </section>
          ))
          : <div className="d-flex flex-column align-items-center mb-5">
            <img src={QuestionDoesntExistIcon} alt="" />
            <h5><b>Belum Ada Soal</b></h5>
          </div>
        }
      </div>
    )
  }
}

function QuestionWrapper ({ question, orderNumber, handleInput, handleAction, cacheQuestionsData, children }) {
  const handleQuestionText = event => {
    const questionValue = event.editor.getData()
    if (questionValue === question.question_text) return

    const clonedQuestion = { ...question }
    clonedQuestion.question_text = questionValue
    handleInput(clonedQuestion)
  }

  return <div key={question.question_id} className="question-item mt-4">
    <section className="d-flex align-items-start">
      <label className="question-editor form-control h-auto question-item-width mr-3">
        <CKEditor
          type="inline"
          config={{ toolbar: editorToolbar }}
          data={question.question_text}
          onChange={handleQuestionText}
          onBlur={cacheQuestionsData}
        />
      </label>
      <div className="question-action">
        <div className="question-remove" role="button" onClick={handleAction('remove')}>
          <img src={QuestionRemoveIcon} alt="" />
        </div>
        <div className="question-add" role="button" onClick={handleAction('add')}>
          <img src={QuestionAddIcon} alt="" />
        </div>
      </div>
      <div className="ml-auto text-white bg-primary h5 rounded-circle d-flex align-items-center justify-content-center question-order">
        <b>{orderNumber}</b>
      </div>
    </section>
    {children}
  </div>
}

function QuestionSingle ({ question, orderNumber, handleInput, handleAction, cacheQuestionsData }) {
  const handleOptionText = optionIndex => event => {
    const optionValue = event.editor.getData()
    if (optionValue === question.options[optionIndex].option_text) return

    const clonedQuestion = { ...question }
    clonedQuestion.options[optionIndex].option_text = optionValue
    handleInput(clonedQuestion)
  }

  const handleOptionCorrect = event => {
    const clonedQuestion = { ...question }
    for (const loopIndex in clonedQuestion.options) {
      clonedQuestion.options[loopIndex].is_correct = loopIndex == event.target.value ? 1 : 0
    }
    handleInput(clonedQuestion)
    cacheQuestionsData(true)
  }

  return <QuestionWrapper {...{ question, orderNumber, handleInput, handleAction, cacheQuestionsData }}>
    {question.options.map((option, optionIndex) =>
      <section key={option.option_id} className="d-flex mt-3">
        <label className="form-control h-auto question-item-width mr-4">
          <CKEditor
            type="inline"
            config={{ toolbar: editorToolbar }}
            data={option.option_text}
            onChange={handleOptionText(optionIndex)}
            onBlur={cacheQuestionsData}
          />
        </label>
        <label className="d-flex align-items-center">
          <input
            type="radio"
            className="mr-3 form-radio"
            checked={typeof option.is_correct === 'boolean' ? (option.is_correct ? 1 : 0) : parseInt(option.is_correct)}
            value={optionIndex}
            onChange={handleOptionCorrect}
          />
          Benar
        </label>
      </section>
    )}
  </QuestionWrapper>
}

function QuestionMulti ({ question, orderNumber, handleInput, handleAction, cacheQuestionsData }) {
  const handleOptionText = optionIndex => event => {
    const optionValue = event.editor.getData()
    if (optionValue === question.options[optionIndex].option_text) return

    const clonedQuestion = { ...question }
    clonedQuestion.options[optionIndex].option_text = optionValue
    handleInput(clonedQuestion)
  }

  const handleOptionCorrect = event => {
    const clonedQuestion = { ...question }
    const option = clonedQuestion.options[event.target.value]
    option.is_correct = !parseInt(option.is_correct) ? 1 : 0
    handleInput(clonedQuestion)
    cacheQuestionsData(true)
  }

  return <QuestionWrapper {...{ question, orderNumber, handleInput, handleAction, cacheQuestionsData }}>
    {question.options.map((option, optionIndex) =>
      <section key={option.option_id} className="d-flex mt-3">
        <label className="form-control h-auto question-item-width mr-4">
          <CKEditor
            type="inline"
            config={{ toolbar: editorToolbar }}
            data={option.option_text}
            onChange={handleOptionText(optionIndex)}
            onBlur={cacheQuestionsData}
          />
        </label>
        <label className="d-flex align-items-center">
          <input
            type="checkbox"
            className="mr-3 form-checkbox"
            checked={typeof option.is_correct === 'boolean' ? (option.is_correct ? 1 : 0) : parseInt(option.is_correct)}
            value={optionIndex}
            onChange={handleOptionCorrect}
          />
          Benar
        </label>
      </section>
    )}
  </QuestionWrapper>
}

function QuestionEssay ({ question, orderNumber, handleInput, handleAction, cacheQuestionsData }) {
  return <QuestionWrapper {...{ question, orderNumber, handleInput, handleAction, cacheQuestionsData }} />
}

export default Editor