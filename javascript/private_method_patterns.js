var distanceModule = function(x1, x2, y1, y2) {
  // State:
  var answer,
      firstDifference,
      firstSquared,
      secondDifference,
      secondSquared,
      sum;

  function _add() {
    sum = firstSquared + secondSquared;
  }

  function _getRoot() {
    answer = Math.sqrt(sum);
  }

  function _squareFirst() {
    firstSquared = Math.pow(firstDifference, 2);
  }

  function _squareSecond() {
    secondSquared = Math.pow(secondDifference, 2);
  }

  function _subtractFirst() {
    firstDifference = x2 - x1;
  }

  function _subtractSecond() {
    secondDifference = y2 - y1;
  }

  function calculate() {
    _subtractFirst();
    _subtractSecond();
    _squareFirst();
    _squareSecond();
    _add();
    _getRoot();
  }

  function getAnswer() {
    return answer;
  }

  return {
    calculate: calculate,
    getAnswer: getAnswer
  };
};

var DistancePrototypeClosure = (function() {
  function Constructor(x1, x2, y1, y2) {
    this.answer = null;
    this.firstDifference = null;
    this.firstSquared = null;
    this.secondDifference = null;
    this.secondSquared = null;
    this.sum = null;
    this.x1 = x1;
    this.x2 = x2;
    this.y1 = y1;
    this.y2 = y2;
  }

  Constructor.prototype.calculate = function() {
    _subtractFirst.call(this);
    _subtractSecond.call(this);
    _squareFirst.call(this);
    _squareSecond.call(this);
    _add.call(this);
    _getRoot.call(this);
  };

  Constructor.prototype.getAnswer = function() {
    return this.answer;
  };

  function _add() {
    this.sum = this.firstSquared + this.secondSquared;
  }

  function _getRoot() {
    this.answer = Math.sqrt(this.sum);
  }

  function _squareFirst() {
    this.firstSquared = Math.pow(this.firstDifference, 2);
  }

  function _squareSecond() {
    this.secondSquared = Math.pow(this.secondDifference, 2);
  }

  function _subtractFirst() {
    this.firstDifference = this.x2 - this.x1;
  }

  function _subtractSecond() {
    this.secondDifference = this.y2 - this.y1;
  }

  return Constructor;
})();

function DistancePrototype(x1, x2, y1, y2) {
  this.answer = null;
  this.firstDifference = null;
  this.firstSquared = null;
  this.secondDifference = null;
  this.secondSquared = null;
  this.sum = null;
  this.x1 = x1;
  this.x2 = x2;
  this.y1 = y1;
  this.y2 = y2;
}

DistancePrototype.prototype.calculate = function() {
  this._subtractFirst();
  this._subtractSecond();
  this._squareFirst();
  this._squareSecond();
  this._add();
  this._getRoot();
};

DistancePrototype.prototype.getAnswer = function() {
  return this.answer;
};

DistancePrototype.prototype._add = function() {
  this.sum = this.firstSquared + this.secondSquared;
};

DistancePrototype.prototype._getRoot = function() {
  this.answer = Math.sqrt(this.sum);
};

DistancePrototype.prototype._squareFirst = function() {
  this.firstSquared = Math.pow(this.firstDifference, 2);
};

DistancePrototype.prototype._squareSecond = function() {
  this.secondSquared = Math.pow(this.secondDifference, 2);
};

DistancePrototype.prototype._subtractFirst = function() {
  this.firstDifference = this.x2 - this.x1;
};

DistancePrototype.prototype._subtractSecond = function() {
  this.secondDifference = this.y2 - this.y1;
};

var dM = distanceModule(10, 30, 5, 15);
dM.calculate();
console.log(dM.getAnswer());

var dPC = new DistancePrototypeClosure(10, 30, 5, 15);
dPC.calculate();
console.log(dPC.getAnswer());

var dP = new DistancePrototype(10, 30, 5, 15);
dP.calculate();
console.log(dP.getAnswer());
