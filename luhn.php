public static function luhnCheck($card)
{
  $card = preg_replace("/[^\d]/", "", $card);
  $digits = str_split(strrev($card));
  $total = 0;
  for($i = 1; $i < count($digits); $i++)
  {
    if($i % 2 > 0)
    {
      //Multiplication
      $total += array_sum(str_split($digits[$i] * 2));
    }
    else
    {
      //Normal
      $total += $digits[$i];
    }
  }
  return ($total + $digits[0]) % 10 == 0;
}
