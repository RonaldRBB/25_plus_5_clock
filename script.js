/**
 * *****************************************************************************
 * CONSTANTS
 * *****************************************************************************
 */
const START = "START";
const STOP = "STOP";
const RESET = "RESET";
const SET_TIME = "SET_TIME";
const INCREMENT_BREAK = "INCREMENT_BREAK";
const DECREMENT_BREAK = "DECREMENT_BREAK";
const INCREMENT_SESSION = "INCREMENT_SESSION";
const DECREMENT_SESSION = "DECREMENT_SESSION";
const CHANGE_TIMER_TYPE = "CHANGE_TIMER_TYPE";
const BREAK_LENGTH = 5;
const SESSION_LENGTH = 25;
const INITIAL_TIME = 1500;
const SESSION = "SESSION";
const BREAK = "BREAK";
const SOUND_URL =
"https://freesound.org/data/previews/536/536774_1415754-lq.mp3";
/**
 * *****************************************************************************
 * REACT
 * *****************************************************************************
 */
const startTimer = () => ({ type: START });
const stopTimer = () => ({ type: STOP });
const resetTimer = () => ({ type: RESET });
const setTime = time => ({ type: SET_TIME, time });
const incrementBreak = () => ({ type: INCREMENT_BREAK });
const decrementBreak = () => ({ type: DECREMENT_BREAK });
const incrementSession = () => ({ type: INCREMENT_SESSION });
const decrementSession = () => ({ type: DECREMENT_SESSION });
const changeTimerType = () => ({ type: CHANGE_TIMER_TYPE });
const initialState = {
  breakLength: BREAK_LENGTH,
  sessionLength: SESSION_LENGTH,
  timerType: SESSION,
  time: INITIAL_TIME,
  isRunning: false };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case START:
      return {
        ...state,
        isRunning: true };

    case STOP:
      return {
        ...state,
        isRunning: false };

    case RESET:
      return {
        ...state,
        breakLength: BREAK_LENGTH,
        sessionLength: SESSION_LENGTH,
        timerType: SESSION,
        time: INITIAL_TIME,
        isRunning: false };

    case SET_TIME:
      return {
        ...state,
        time: action.time };

    case INCREMENT_BREAK:
      return {
        ...state,
        breakLength: state.breakLength + 1 };

    case DECREMENT_BREAK:
      return {
        ...state,
        breakLength: state.breakLength - 1 };

    case INCREMENT_SESSION:
      return {
        ...state,
        sessionLength: state.sessionLength + 1,
        time: (state.sessionLength + 1) * 60 };

    case DECREMENT_SESSION:
      return {
        ...state,
        sessionLength: state.sessionLength - 1,
        time: (state.sessionLength - 1) * 60 };

    case CHANGE_TIMER_TYPE:
      return {
        ...state,
        timerType: state.timerType === SESSION ? BREAK : SESSION };

    default:
      return state;}

};
const store = Redux.createStore(reducer);
/**
 * -----------------------------------------------------------------------------
 * Break
 * -----------------------------------------------------------------------------
 */
class Break extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return React.createElement("div", { className: "btn-group col-4" }, [
    React.createElement(
    "button",
    {
      className: "btn btn-primary",
      id: "break-decrement",
      onClick: this.props.handleDecrementBreak },

    React.createElement("i", {
      className: "fas fa-minus" })),


    React.createElement(
    "div",
    {
      className: "btn btn-outline-primary",
      id: "break-length" },

    this.props.breakLength),

    React.createElement(
    "button",
    {
      className: "btn btn-primary",
      id: "break-increment",
      onClick: this.props.handleIncrementBreak },

    React.createElement("i", {
      className: "fas fa-plus" }))]);



  }}

/**
 * -----------------------------------------------------------------------------
 * Session
 * -----------------------------------------------------------------------------
 */
class Session extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return React.createElement("div", { className: "btn-group col-4" }, [
    React.createElement(
    "button",
    {
      className: "btn btn-primary",
      id: "session-decrement",
      onClick: this.props.handleDecrementSession },

    React.createElement("i", {
      className: "fas fa-minus" })),


    React.createElement(
    "div",
    {
      className: "btn btn-outline-primary",
      id: "session-length" },

    this.props.sessionLength),

    React.createElement(
    "button",
    {
      className: "btn btn-primary",
      id: "session-increment",
      onClick: this.props.handleIncrementSession },

    React.createElement("i", {
      className: "fas fa-plus" }))]);



  }}

/**
 * -----------------------------------------------------------------------------
 * Control Buttons
 * -----------------------------------------------------------------------------
 */
class ControlButtons extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return React.createElement("div", { className: "btn-group" }, [
    React.createElement(
    "button",
    {
      className: "btn btn-primary",
      id: "start_stop",
      onClick: this.props.handleStartStop },

    [
    React.createElement("i", { className: "fas fa-play" }),
    React.createElement("i", { className: "fas fa-pause" })]),


    React.createElement(
    "button",
    {
      className: "btn btn-primary",
      id: "reset",
      onClick: this.props.handleReset },

    React.createElement("i", {
      className: "fas fa-sync" }))]);



  }}

/**
 * -----------------------------------------------------------------------------
 * Toolbar Label
 * -----------------------------------------------------------------------------
 */
class ToolbarLabel extends React.Component {
  render() {
    return React.createElement("div", { className: "row" }, [
    React.createElement(
    "div",
    { className: "col-4", id: "break-label" },
    "Break Length"),

    React.createElement(
    "div",
    { className: "col-4 text-center" },
    "Control"),

    React.createElement(
    "div",
    { className: "col-4 text-end", id: "session-label" },
    "Session Length")]);


  }}


/**
 * -----------------------------------------------------------------------------
 * Toolbar
 * -----------------------------------------------------------------------------
 */
class Toolbar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return React.createElement(
    "div",
    { className: "btn-toolbar justify-content-between" },
    [
    React.createElement(
    Break,
    {
      breakLength: this.props.breakLength,
      handleDecrementBreak: this.props.handleDecrementBreak,
      handleIncrementBreak: this.props.handleIncrementBreak },

    null),

    React.createElement(
    ControlButtons,
    {
      handleStartStop: this.props.handleStartStop,
      handleReset: this.props.handleReset },

    null),

    React.createElement(
    Session,
    {
      sessionLength: this.props.sessionLength,
      handleDecrementSession:
      this.props.handleDecrementSession,
      handleIncrementSession:
      this.props.handleIncrementSession },

    null)]);



  }}

/**
 * -----------------------------------------------------------------------------
 * Display
 * -----------------------------------------------------------------------------
 */
class Display extends React.Component {
  constructor(props) {
    super(props);
  }
  convertSecondsToTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
    secondsLeft < 10 ? "0" : ""
    }${secondsLeft}`;
  }
  render() {
    return React.createElement(
    "div",
    {
      className: "text-center p-3" },

    [
    React.createElement(
    "p",
    { id: "timer-label" },
    this.props.timerType),

    React.createElement(
    "h1",
    { id: "time-left" },
    this.convertSecondsToTime(this.props.time))]);



  }}

/**
 * -----------------------------------------------------------------------------
 * Pomodoro Clock
 * -----------------------------------------------------------------------------
 */
class PomodoroClock extends React.Component {
  constructor(props) {
    super(props);
    this.handleDecrementBreak = this.handleDecrementBreak.bind(this);
    this.handleIncrementBreak = this.handleIncrementBreak.bind(this);
    this.handleDecrementSession = this.handleDecrementSession.bind(this);
    this.handleIncrementSession = this.handleIncrementSession.bind(this);
    this.handleStartStop = this.handleStartStop.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }
  componentDidMount() {
    setInterval(() => {
      if (this.props.isRunning === true) this.setTime();
    }, 1000);
  }
  setTime() {
    const sessionLength = this.props.sessionLength * 60;
    const breakLength = this.props.breakLength * 60;
    this.props.setTime(this.props.time - 1);
    if (this.props.time === 0) this.playAudio();
    if (this.props.time === -1) {
      this.handleTimerType();
      if (this.props.timerType === SESSION)
      this.props.setTime(sessionLength);else
      this.props.setTime(breakLength);
    }
  }
  handleTimerType() {
    this.props.changeTimerType();
  }
  handleDecrementBreak() {
    if (!this.props.isRunning && this.props.breakLength > 1) {
      this.props.decrementBreak();
    }
  }
  handleIncrementBreak() {
    if (!this.props.isRunning && this.props.breakLength < 60) {
      this.props.incrementBreak();
    }
  }
  handleDecrementSession() {
    if (!this.props.isRunning && this.props.sessionLength > 1) {
      this.props.decrementSession();
    }
  }
  handleIncrementSession() {
    if (!this.props.isRunning && this.props.sessionLength < 60) {
      this.props.incrementSession();
    }
  }
  handleStartStop() {
    if (this.props.isRunning === false) this.props.startTimer();else
    this.props.stopTimer();
  }
  handleReset() {
    this.props.resetTimer();
    this.stopAudio();
  }
  playAudio() {
    const audio = document.getElementById("beep");
    audio.play();
  }
  stopAudio() {
    const audio = document.getElementById("beep");
    audio.pause();
    audio.currentTime = 0;
  }

  render() {
    return React.createElement(
    "div",
    {
      className: "w-50 p-3 rounded border" },

    [
    React.createElement(
    Display,
    { time: this.props.time, timerType: this.props.timerType },
    null),

    React.createElement(ToolbarLabel, null),
    React.createElement(
    Toolbar,
    {
      breakLength: this.props.breakLength,
      sessionLength: this.props.sessionLength,
      handleDecrementBreak: this.handleDecrementBreak,
      handleIncrementBreak: this.handleIncrementBreak,
      handleDecrementSession: this.handleDecrementSession,
      handleIncrementSession: this.handleIncrementSession,
      handleStartStop: this.handleStartStop,
      handleReset: this.handleReset },

    null),

    React.createElement("audio", {
      id: "beep",
      src: SOUND_URL,
      style: { display: "none" } })]);



  }}

/**
 * *****************************************************************************
 * REACT REDUX
 * *****************************************************************************
 */
const Provider = ReactRedux.Provider;
const connect = ReactRedux.connect;
const mapStateToProps = state => ({
  breakLength: state.breakLength,
  sessionLength: state.sessionLength,
  timerType: state.timerType,
  time: state.time,
  isRunning: state.isRunning });

const mapDispatchToProps = dispatch => ({
  startTimer: () => dispatch(startTimer()),
  stopTimer: () => dispatch(stopTimer()),
  resetTimer: () => dispatch(resetTimer()),
  setTime: time => dispatch(setTime(time)),
  incrementBreak: () => dispatch(incrementBreak()),
  decrementBreak: () => dispatch(decrementBreak()),
  incrementSession: () => dispatch(incrementSession()),
  decrementSession: () => dispatch(decrementSession()),
  changeTimerType: () => dispatch(changeTimerType()) });

const PomodoroClockContainer = connect(
mapStateToProps,
mapDispatchToProps)(
PomodoroClock);
/**
 * -----------------------------------------------------------------------------
 * AppWrapper
 * -----------------------------------------------------------------------------
 */
class AppWrapper extends React.Component {
  render() {
    return React.createElement(
    Provider,
    { store: store },
    React.createElement(PomodoroClockContainer, null));

  }}

/**
 * *****************************************************************************
 * RENDER
 * *****************************************************************************
 */
const app = document.getElementById("app");
app.className =
"container-fluid d-flex flex-column min-vh-100 justify-content-center align-items-center";
ReactDOM.render(React.createElement(AppWrapper, null), app);