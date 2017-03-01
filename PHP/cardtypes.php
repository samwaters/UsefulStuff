<?php
  private function _cardTypeFromNumber($card_number)
  {
    /*
     * According to the API, "" should work for undefined, but it doesn't seem to
     * Type           Prefix          Length
     * AMEX           34, 37          15
     * CarteBlanche   38              14 (UNSUPPORTED!)
     * Diners Club    300-305, 36     14
     * Discover       6011            16
     * EnRoute        2014,2149       15 (UNSUPPORTED!)
     * JCB            3, 2131, 1800   15,16
     * MC             51-55           16
     * Visa           4               13,16
     */
    $card_number = preg_replace("/[^\d]/", "", $card_number);
    if(strlen($card_number) < 13 || strlen($card_number) > 16)
    {
      return "";
    }
    $prefix1 = substr($card_number, 0, 1);
    $prefix2 = substr($card_number, 0, 2);
    $prefix3 = substr($card_number, 0, 3);
    $prefix4 = substr($card_number, 0, 4);
    switch(true)
    {
      case $prefix2 == "34" || $prefix2 == "37":
        return "AX";
      case ($prefix3 >= "300" && $prefix3 <= "305") || $prefix2 == "36":
        return "DC";
      case $prefix4 == "6011":
        return "DI";
      case $prefix1 == "3" || $prefix4 == "2131" || $prefix4 == "1800":
        return "JC";
      case $prefix2 >= "51" && $prefix2 <= "55":
        return "MC";
      case $prefix1 == "4":
        return "VI";
    }
    return "";
  }