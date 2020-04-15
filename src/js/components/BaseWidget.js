class BaseWidget {
  constructor(wrapperElement, initialValue) { //wrapperElement - element DOM z widgetem, initial value - poczatkowa wartosc widgetu
    const thisWidget = this;

    thisWidget.dom = {};
    thisWidget.dom.wrapper = wrapperElement;

    thisWidget.correctValue = initialValue;

  }

  get value(){
    const thisWidget = this;

    return thisWidget.correctValue; 
  }

  set value(value) {
    const thisWidget = this;

    const newValue = thisWidget.parseValue(value);

    if (newValue != thisWidget.correctValue && thisWidget.isValid(newValue)) {
      thisWidget.correctValue = newValue;
      thisWidget.announce();
    }

    thisWidget.renderValue();

  }

  setValue(value){
    const thisWidget = this;

    thisWidget.value = value;
  }

  //przyjmujemy, ze domyslna glowna wartoscia baseWidgetu jest liczba
  parseValue(value){
    return parseInt(value);
  }

  isValid(value){
    return !isNaN(value);
  }

  renderValue(){ 
    const thisWidget = this;

    thisWidget.dom.wrapper.innerHTML = thisWidget.value;
  }

  announce() {
    const thisWidget = this;

    const event = new CustomEvent('updated', {
      bubbles: true
    });
    thisWidget.dom.wrapper.dispatchEvent(event);
  }
}

export default BaseWidget;
 