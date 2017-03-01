<?php
/**
 * Send commit messages from GitLab to Slack
 * To use this script, you will need an integration URL from Slack
 * Under the Integrations page, select Incoming Webhooks Integration and select a channel for the messages to be sent to
 * Slack will then give you a Webhooks URL to use
 *
 * You will then need to host this script somewhere accessible from the web (you can enable access control below if necessary)
 * Then, in GitLab, you will need to add a WebHook for Push events, and set the URL to wherever you hosted this script
 */
 
//Uncomment this block for access control
/*
if($_SERVER["HTTP_X_FORWARDED_FOR"] != "127.0.0.1")
{
  header("Location: /", true, 403);
  exit;
}
*/
$data = json_decode(file_get_contents("php://input"), true);
if(!$data)
{
  header("Location: /", true, 404);
  exit;
}
foreach($data["commits"] as $commit)
{
  //Message will be something like
  //Commit to Test repository by GitUser - Sample Commit
  $text = "Commit to <" . $data["repository"]["homepage"] . "|" . $data["repository"]["name"] . ">";
  $text .= " repository by <mailto:" . $commit["author"]["email"] . "|" . $commit["author"]["name"] . ">";
  $text .= " - <" . $commit["url"] . "|" . $commit["message"] . ">";
  $msg = [
    "channel" => "#git-activity",
    //Uncomment this for custom bot icons
    //"icon-url" => "http://127.0.0.1/img/icon.png",
    "text" => $text,
    //Change this to whatever is appropriate
    "username" => "commit-bot"
  ];
  $msg = json_encode($msg);
  //Set this to the URL from Slack
  $ch = curl_init("YOUR_SLACK_INTEGRATION_URL");
  curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
  curl_setopt($ch, CURLOPT_HTTPHEADER, array("Content-Type: application/json", "Content-Length: " . strlen($msg)));
  curl_setopt($ch, CURLOPT_POST, true);
  curl_setopt($ch, CURLOPT_POSTFIELDS, $msg);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_exec($ch);
}
echo "OK";
exit;