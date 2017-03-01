Array.prototype.sum = function() {
  var total = 0, length = this.length;
  for(var i = 0; i < length; i++)
  {
    var parsedValue = parseFloat(this[i]);
    if(!isNaN(parsedValue))
    {
      total += parsedValue;
    }
  }
  return total;
};

function luhnCheck(cardNumber)
{
  cardNumber = cardNumber.replace(/[^\d]/, "");
  var digits = cardNumber.split("").reverse();
  var total = 0;
  for(var i = 1; i<digits.length; i++)
  {
    if(i % 2 > 0)
    {
      //Multiplication
      var doubledValue = "" + (digits[i] * 2);
      total += parseFloat(doubledValue.split("").sum());
    }
    else
    {
      //Normal
      total += parseInt(digits[i]);
    }
  }
  return (total + parseFloat(digits[0])) % 10 == 0;
}