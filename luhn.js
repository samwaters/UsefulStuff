Array.prototype.sum = function() {
  var total = 0, length = this.length;
  for(var i = 0; i < length; i++)
  {
    if(/^\-?(\d+)?(\.\d+)?(e\d+)?$/.test(this[i]))
    {
      total += parseFloat(this[i]);
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
