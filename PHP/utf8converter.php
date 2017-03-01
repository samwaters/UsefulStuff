<?php
class Encoding
{
  public static function toUTF8($str)
  {
    $encoding = self::detectEncoding($str);
    return $encoding == "UTF-8" ? $str : iconv($encoding, "UTF-8", $str);
  }
  public static function detectEncoding($str)
  {
    $knownEncodings = ["UTF-8", "ISO-8859-1", "Windows-1252", "ASCII", "ISO-8859-15", "ISO-8859-6", "CP1256"];
    foreach($knownEncodings as $encoding)
    {
      if($str === iconv($encoding, $encoding, $str))
      {
        return $encoding;
      }
    }
    return "UTF-8";
  }
}