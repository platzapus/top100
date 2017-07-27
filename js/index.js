"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//One component, houses table of 100 fCC users. At least 3 columns: Username, Brownies in past 30, Brownies overall.

var Tophundo = function (_React$Component) {
  _inherits(Tophundo, _React$Component);

  function Tophundo(props) {
    _classCallCheck(this, Tophundo);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = {
      listed: null,
      howSort: "recent"
    };
    _this.fetchList = _this.fetchList.bind(_this);
    _this.changeSort = _this.changeSort.bind(_this);
    return _this;
  }

  Tophundo.prototype.componentDidMount = function componentDidMount() {
    this.fetchList(this.state.howSort);
    console.log('didmount');
  };

  Tophundo.prototype.componentDidUpdate = function componentDidUpdate() {
    this.fetchList(this.state.howSort);
  };

  Tophundo.prototype.changeSort = function changeSort(howSort) {
    this.setState({ howSort: howSort }, function () {
      console.log(this.state.howSort);
    });
    if (howSort == "recent") {
      $('#monthly').css('background-color', 'green');
      $('#monthly').css('color', 'white');
      $('#monthly').html('Past Month Brownies <i class="fa fa-caret-down"></i>');
      $('#total').css('background-color', 'lightgray');
      $('#total').css('color', 'black');
      $('#total').html('Total Brownies');
    } else if (howSort == 'alltime') {
      $('#monthly').css('background-color', 'lightgray');
      $('#monthly').css('color', 'black');
      $('#monthly').html('Past Month Brownies');
      $('#total').css('background-color', 'green');
      $('#total').css('color', 'white');
      $('#total').html('Total Brownies <i class="fa fa-caret-down"></i>');
    }
  };

  Tophundo.prototype.fetchList = function fetchList(sortPick) {

    $.ajax({
      url: 'https://fcctop100.herokuapp.com/api/fccusers/top/' + sortPick,
      dataType: 'json',
      cache: false,
      success: function (data) {
        var listed = data;
        if (JSON.stringify(this.state.listed) != JSON.stringify(listed)) {
          this.setState({ listed: listed });
        }
      }.bind(this)
    });

    /* .then(function(data){
     console.log(data);
       this.setState(function() {;
         return {
           listed: data
         }
       })
     });*/
  };

  Tophundo.prototype.render = function render() {
    console.log('rendering...');
    return React.createElement(
      "div",
      null,
      !this.state.listed ? React.createElement(
        "div",
        null,
        "haHAA"
      ) //Make a <Loading /> component you lazy asshole.
      : React.createElement(TableMaker, { listed: this.state.listed, changeSort: this.changeSort, type: this.state.howSort })
    );
  };

  return Tophundo;
}(React.Component);

var TableMaker = function (_React$Component2) {
  _inherits(TableMaker, _React$Component2);

  function TableMaker() {
    _classCallCheck(this, TableMaker);

    return _possibleConstructorReturn(this, _React$Component2.apply(this, arguments));
  }

  TableMaker.prototype.render = function render() {
    //console.log(this.props.type);
    return React.createElement(
      "div",
      { className: "container" },
      React.createElement(
        "h3",
        null,
        React.createElement("i", { className: "fa fa-free-code-camp" }),
        " freeCodeCamp Leaderboard"
      ),
      React.createElement(
        "table",
        null,
        React.createElement(
          "tr",
          null,
          React.createElement(
            "th",
            null,
            "Rank"
          ),
          React.createElement(
            "th",
            null,
            "Username"
          ),
          React.createElement(
            "th",
            { id: "monthly", onClick: this.props.changeSort.bind(this, 'recent') },
            "Past Month Brownies ",
            React.createElement("i", { className: "fa fa-caret-down" })
          ),
          React.createElement(
            "th",
            { id: "total", onClick: this.props.changeSort.bind(this, 'alltime') },
            "Total Brownies"
          )
        ),
        this.props.listed.map(function (list, index) {
          return React.createElement(
            "tr",
            null,
            React.createElement(
              "td",
              null,
              index + 1
            ),
            React.createElement(
              "td",
              { className: "users" },
              React.createElement(
                "a",
                { href: "https://www.freecodecamp.com/" + list.username },
                React.createElement("img", { src: list.img }),
                "  ",
                list.username
              )
            ),
            React.createElement(
              "td",
              null,
              list.recent
            ),
            React.createElement(
              "td",
              null,
              list.alltime
            )
          );
        })
      )
    );
  };

  return TableMaker;
}(React.Component);

ReactDOM.render(React.createElement(Tophundo, null), document.getElementById('app'));

//Next steps:
//1.Create state switcher function
//2.Pass function to TableMaker and apply through onclick to Past Month and Total Brownie headers
//3.Create second api call to cover Total Brownies sort (or implement to current one?)
//4.Loading component