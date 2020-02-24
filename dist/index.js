(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('react-dom')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react', 'react-dom'], factory) :
  (global = global || self, factory(global.ReactCalendars = {}, global.React, global.ReactDOM));
}(this, (function (exports, React, ReactDOM) { 'use strict';

  React = React && React.hasOwnProperty('default') ? React['default'] : React;
  ReactDOM = ReactDOM && ReactDOM.hasOwnProperty('default') ? ReactDOM['default'] : ReactDOM;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }

  function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};

    var target = _objectWithoutPropertiesLoose(source, excluded);

    var key, i;

    if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

      for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
        target[key] = source[key];
      }
    }

    return target;
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    }
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _iterableToArrayLimit(arr, i) {
    if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
      return;
    }

    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }

  var firstDay = 1;
  var daysTitles = ['MON', 'TUE', 'WEN', 'THU', 'FRI', 'SAT', 'SUN'];
  var monthsTitles = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var libClassName = 'react-calendar';
  var setConfiguration = function setConfiguration() {
    var o = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    if (o.firstDay) firstDay = o.firstDay;
    if (o.daysTitles) daysTitles = o.daysTitles;
    if (o.monthsTitles) monthsTitles = o.monthsTitles;
    if (o.libClassName) libClassName = o.libClassName;
  };

  var MonthDay =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(MonthDay, _React$Component);

    function MonthDay() {
      var _getPrototypeOf2;

      var _this;

      _classCallCheck(this, MonthDay);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(MonthDay)).call.apply(_getPrototypeOf2, [this].concat(args)));

      _defineProperty(_assertThisInitialized(_this), "onClick", function (e) {
        var _previousDay = _this.props.selectedDay ? new Date(_this.props.selectedDay.getTime()) : null;

        var selectedDay = new Date(_this.props.year, _this.props.month, _this.props.day);

        _this.props.selectDay(e, selectedDay, _previousDay);
      });

      return _this;
    }

    _createClass(MonthDay, [{
      key: "render",
      value: function render() {
        return React.createElement("button", {
          type: "button",
          onClick: this.onClick
        }, this.props.day);
      }
    }]);

    return MonthDay;
  }(React.Component);

  var Month =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(Month, _React$Component);

    function Month(props) {
      var _this;

      _classCallCheck(this, Month);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Month).call(this, props));

      _defineProperty(_assertThisInitialized(_this), "isDay", function (date, day) {
        return date instanceof Date && _this.props.year === date.getFullYear() && _this.props.month === date.getMonth() && day === date.getDate();
      });

      _this.state = Month.getDerivedStateFromProps(props);
      return _this;
    }

    _createClass(Month, [{
      key: "getDayClass",
      value: function getDayClass(day) {
        var _this2 = this;

        var c = ["".concat(libClassName, "-day")];
        if (this.props.selectedDay && this.isDay(this.props.selectedDay, day)) c.push('is-selected');
        var dateClass = this.props.dateClasses.find(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 1),
              date = _ref2[0];

          return _this2.isDay(date, day);
        });
        if (dateClass) c.push(dateClass[1]);
        return c.join(' ');
      }
    }, {
      key: "render",
      value: function render() {
        var _this3 = this;

        return React.createElement("div", {
          className: "".concat(libClassName, "-month")
        }, this.props.displayMonthTitle && monthsTitles[this.props.month], this.props.displayDayTitles && React.createElement("ul", {
          className: "".concat(libClassName, "-day-titles")
        }, _toConsumableArray(Array(7)).map(function (_, i) {
          return React.createElement("li", {
            key: i
          }, daysTitles[i]);
        })), React.createElement("ul", {
          className: "".concat(libClassName, "-days")
        }, _toConsumableArray(Array(this.state.numberOfDays + this.state.offset)).map(function (_, i) {
          return React.createElement("li", {
            className: _this3.getDayClass(i - _this3.state.offset + 1),
            key: i
          }, i >= _this3.state.offset && React.createElement(MonthDay, {
            day: i - _this3.state.offset + 1,
            selectDay: _this3.props.selectDay,
            selectedDay: _this3.props.selectedDay,
            month: _this3.props.month,
            year: _this3.props.year,
            onSelect: _this3.props.onSelect
          }));
        })));
      }
    }], [{
      key: "getDerivedStateFromProps",
      value: function getDerivedStateFromProps(props) {
        var offset = new Date(props.year, props.month, 1).getDay() - firstDay;
        return {
          numberOfDays: new Date(props.month + 1 > 11 ? props.year + 1 : props.year, props.month + 1 > 11 ? props.month + 1 : 0, 0).getDate(),
          offset: offset > 0 ? offset : 7 + offset
        };
      }
    }]);

    return Month;
  }(React.Component);

  var MonthPicker =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(MonthPicker, _React$Component);

    function MonthPicker() {
      var _getPrototypeOf2;

      var _this;

      _classCallCheck(this, MonthPicker);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(MonthPicker)).call.apply(_getPrototypeOf2, [this].concat(args)));

      _defineProperty(_assertThisInitialized(_this), "onClickPrevious", function () {
        if (_this.props.month > 0) {
          _this.props.setMonth(_this.props.month - 1);
        } else {
          _this.props.setMonth(11);

          _this.props.setYear(_this.props.year - 1);
        }
      });

      _defineProperty(_assertThisInitialized(_this), "onClickNext", function () {
        if (_this.props.month < 11) {
          _this.props.setMonth(_this.props.month + 1);
        } else {
          _this.props.setMonth(0);

          _this.props.setYear(_this.props.year + 1);
        }
      });

      return _this;
    }

    _createClass(MonthPicker, [{
      key: "render",
      value: function render() {
        return React.createElement("div", {
          className: "".concat(libClassName, "-month-picker")
        }, React.createElement("button", {
          className: "previous-button",
          type: "button",
          onClick: this.onClickPrevious
        }, "Previous"), monthsTitles[this.props.month], React.createElement("button", {
          className: "next-button",
          type: "button",
          onClick: this.onClickNext
        }, "Next"));
      }
    }]);

    return MonthPicker;
  }(React.Component);

  var YearPicker =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(YearPicker, _React$Component);

    function YearPicker() {
      var _getPrototypeOf2;

      var _this;

      _classCallCheck(this, YearPicker);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(YearPicker)).call.apply(_getPrototypeOf2, [this].concat(args)));

      _defineProperty(_assertThisInitialized(_this), "onClickPrevious", function () {
        return _this.props.setYear(_this.props.year - 1);
      });

      _defineProperty(_assertThisInitialized(_this), "onClickNext", function () {
        return _this.props.setYear(_this.props.year + 1);
      });

      return _this;
    }

    _createClass(YearPicker, [{
      key: "render",
      value: function render() {
        return React.createElement("div", {
          className: "".concat(libClassName, "-year-picker")
        }, React.createElement("button", {
          className: "previous-button",
          type: "button",
          onClick: this.onClickPrevious
        }, "Previous"), this.props.year, React.createElement("button", {
          className: "next-button",
          type: "button",
          onClick: this.onClickNext
        }, "Next"));
      }
    }]);

    return YearPicker;
  }(React.Component);

  var Calendar =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(Calendar, _React$Component);

    function Calendar(props) {
      var _this;

      _classCallCheck(this, Calendar);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Calendar).call(this, props));

      _defineProperty(_assertThisInitialized(_this), "selectDay", function (e, selectedDay, previousDay) {
        _this.setState({
          selectedDay: selectedDay
        }, function () {
          return _this.props.onSelect(e, selectedDay, previousDay);
        });
      });

      _defineProperty(_assertThisInitialized(_this), "setMonth", function (month) {
        _this.setState({
          month: month
        });
      });

      _defineProperty(_assertThisInitialized(_this), "setYear", function (year) {
        _this.setState({
          year: year
        });
      });

      _this.state = {
        selectedDay: _this.props.selectedDay,
        month: props.month,
        year: props.year
      };
      return _this;
    }

    _createClass(Calendar, [{
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.year !== prevProps.year || this.props.month !== prevProps.month || this.props.selectedDay !== prevProps.selectedDay) this.setState({
          selectedDay: this.props.selectedDay,
          year: this.props.year,
          month: this.props.month
        });
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        return React.createElement("div", {
          ref: this.props.reference,
          className: "".concat(libClassName, " ").concat(this.props.className || ''),
          style: this.props.style
        }, this.props.displayYearPicker && React.createElement(YearPicker, {
          setYear: this.setYear,
          year: this.state.year
        }), this.props.displayMonthPicker && React.createElement(MonthPicker, {
          month: this.state.month,
          setMonth: this.setMonth,
          setYear: this.setYear,
          year: this.state.year
        }), React.createElement("ul", {
          className: "".concat(libClassName, "-months")
        }, _toConsumableArray(Array(this.props.visibleMonths)).map(function (_, i) {
          return React.createElement("li", {
            key: i
          }, React.createElement(Month, {
            dateClasses: _this2.props.dateClasses,
            displayMonthTitle: _this2.props.displayMonthTitle,
            displayDayTitles: _this2.props.displayDayTitles,
            month: _this2.state.month,
            onSelect: _this2.props.onSelect,
            selectDay: _this2.selectDay,
            selectedDay: _this2.state.selectedDay,
            visibleMonths: _this2.props.visibleMonths,
            year: _this2.state.year
          }));
        })), this.props.after);
      }
    }]);

    return Calendar;
  }(React.Component);

  Calendar.defaultProps = {
    dateClasses: [],
    displayDayTitles: true,
    displayMonthPicker: true,
    displayYearPicker: true,
    month: new Date().getMonth(),
    onSelect: function onSelect() {},
    visibleMonths: 1,
    year: new Date().getFullYear()
  };

  var DatePicker =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(DatePicker, _React$Component);

    function DatePicker(props) {
      var _this;

      _classCallCheck(this, DatePicker);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(DatePicker).call(this, props));

      _defineProperty(_assertThisInitialized(_this), "onFocus", function () {
        return _this.setState({
          displayCalendar: true
        });
      });

      _defineProperty(_assertThisInitialized(_this), "close", function () {
        return _this.setState({
          displayCalendar: false
        });
      });

      _defineProperty(_assertThisInitialized(_this), "onChange", function (e) {
        var state = {
          value: e.target.value
        };

        var selectedDay = _this.props.valueToDate(e.target.value);

        if (selectedDay instanceof Date && !isNaN(selectedDay) && selectedDay.getFullYear() > 999) {
          state.selectedDay = selectedDay;
          state.month = selectedDay.getMonth();
          state.year = selectedDay.getFullYear();
        }

        _this.setState(state);
      });

      _defineProperty(_assertThisInitialized(_this), "onDateSelection", function (e, date, previousDate) {
        _this.setState({
          displayCalendar: false,
          value: _this.props.dateToValue(date),
          selectedDay: date
        }, function () {
          return _this.props.onSelect(e, date, previousDate);
        });
      });

      _this.state = {
        displayCalendar: false,
        value: props.selectedDay ? props.dateToValue(props.selectedDay) : '',
        selectedDay: props.selectedDay,
        month: props.month,
        year: props.year
      };
      _this.calendarRef = React.createRef();
      _this.inputRef = React.createRef();
      return _this;
    }

    _createClass(DatePicker, [{
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.selectedDay !== this.props.selectedDay) this.setState({
          value: this.props.selectedDay ? this.props.dateToValue(this.props.selectedDay) : '',
          selectedDay: this.props.selectedDay
        });
      }
    }, {
      key: "render",
      value: function render() {
        var _this$props = this.props,
            className = _this$props.className,
            dataClasses = _this$props.dataClasses,
            dateToValue = _this$props.dateToValue,
            selectedDay = _this$props.selectedDay,
            visibleMonths = _this$props.visibleMonths,
            displayDayTitles = _this$props.displayDayTitles,
            displayMonthPicker = _this$props.displayMonthPicker,
            month = _this$props.month,
            year = _this$props.year,
            onSelect = _this$props.onSelect,
            valueToDate = _this$props.valueToDate,
            rest = _objectWithoutProperties(_this$props, ["className", "dataClasses", "dateToValue", "selectedDay", "visibleMonths", "displayDayTitles", "displayMonthPicker", "month", "year", "onSelect", "valueToDate"]);

        return React.createElement(React.Fragment, null, React.createElement("input", _extends({
          ref: this.inputRef,
          className: "".concat(libClassName, "-date-picker ").concat(this.props.className || '')
        }, rest, {
          value: this.state.value,
          onFocus: this.onFocus,
          onChange: this.onChange
        })), this.renderCalendar());
      }
    }, {
      key: "renderCalendar",
      value: function renderCalendar() {
        if (this.state.displayCalendar) return ReactDOM.createPortal(React.createElement(Calendar, {
          reference: this.calendarRef,
          style: this.getStyle(),
          className: "is-portal",
          selectedDay: this.state.selectedDay,
          visibleMonths: this.props.visibleMonths,
          displayDayTitles: this.props.displayDayTitles,
          displayMonthPicker: this.props.displayMonthPicker,
          month: this.state.month,
          year: this.state.year,
          onSelect: this.onDateSelection,
          dataClasses: this.props.dataClasses,
          after: React.createElement("button", {
            type: "button",
            onClick: this.close,
            className: "close-button"
          }, "Close")
        }), document.getElementsByTagName('body')[0]);
      }
    }, {
      key: "getStyle",
      value: function getStyle() {
        if (this.props.getStyle) return this.props.getStyle(this.inputRef.current, this.calendarRef.current);
        var rect = this.inputRef.current.getBoundingClientRect();
        var style = {
          left: "".concat(rect.left, "px")
        };

        if (this.props.direction && this.props.direction.toUpperCase() === 'TOP') {
          style.bottom = document.documentElement.scrollHeight - rect.top;
        } else {
          style.top = "".concat(rect.top + rect.height, "px");
        }

        return style;
      }
    }]);

    return DatePicker;
  }(React.Component);

  DatePicker.defaultProps = {
    dateToValue: function dateToValue(date) {
      return date.toLocaleDateString();
    },
    valueToDate: function valueToDate(value) {
      value = value.split(/[/.,-]/g).map(function (v) {
        return parseInt(v);
      });
      var testValue = new Date(2020, 0, 25).toLocaleDateString().split(/[/.,-]/g).map(function (v) {
        return parseInt(v);
      });
      var yearIndex = testValue.indexOf(2020);
      var monthIndex = testValue.indexOf(1);
      var dayIndex = testValue.indexOf(25);
      return new Date(value[yearIndex], value[monthIndex] - 1, value[dayIndex]);
    },
    onSelect: function onSelect() {}
  };

  exports.Calendar = Calendar;
  exports.DatePicker = DatePicker;
  exports.setConfiguration = setConfiguration;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
