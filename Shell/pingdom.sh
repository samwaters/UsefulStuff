#!/bin/bash
# -------------------------------------------------------------
# URL monitoring script with alerts
# Usage: ./pingdom.sh "http://www.google.com" 404
# Creates: alerts/ in $HOME and stores logs for matching events
# -------------------------------------------------------------
mkdir -p "$HOME/alerts"
alerts="$HOME/alerts"
curl -v -L -k "$1" &> $alerts/out.txt
linecount=`grep $2 $alerts/out.txt | wc -l`
if [ $linecount -gt 0 ]; then
  timestamp=`date '+%d%m%Y%H%M'`
  filename="alert_$timestamp.log"
  cp "$alerts/out.txt" "$alerts/$filename"
fi
rm $alerts/out.txt