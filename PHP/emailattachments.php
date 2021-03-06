<?php
class MailHelper
{
  /**
   * Send email with attachments
   * Uses the built-in mail() function, so this needs to be configured properly
   * Example usage:
   * MailHelper::sendMail("sam@samwaters.com", "Me <me@email.com>", "Test mail", array("/home/sam/files/archive.zip", "/home/sam/files/file.txt"));
   */
  public static function sendMail($to, $from, $subject, $message, $attachments)
  {
    $separator = md5(time());
    $eol = "\r\n";
    $mail = "From: $from" . $eol;
    $mail .= "Mime-Version: 1.0" . $eol;
    $mail .= "Content-Type: multipart/mixed; boundary=\"" . $separator . "\"" . $eol . $eol;
    $mail .= "Content-Transfer-Encoding: 7bit" . $eol;
    $mail .= "This is a multi-part message in MIME format" . $eol . $eol;
    //Message
    $mail .= "--" . $separator . $eol;
    $mail .= "Content-Type: text/plain; charset=iso-8859-1" . $eol;
    $mail .= "Content-Transfer-Encoding: 8bit" . $eol . $eol;
    $mail .= $message . $eol . $eol;
    //Attachments
    if(!is_array($attachments))
    {
      $attachments = array($attachments);
    }
    foreach($attachments as $attachment)
    {
      $file = chunk_split(base64_encode(file_get_contents($attachment)));
      $filename = array_pop(explode("/", $attachment));
      $mail .= "--" . $separator . $eol;
      $mail .= "Content-Type: application/octet-stream; name=\"" . $filename . "\"" . $eol;
      $mail .= "Content-Transfer-Encoding: base64" . $eol;
      $mail .= "Content-Disposition: attachment" . $eol . $eol;
      $mail .= $file . $eol . $eol;
    }
    $mail .= "--" . $separator . "--";
    mail($to, $subject, "", $mail);
  }
}