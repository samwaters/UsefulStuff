#!/bin/bash
function getZone {
  zone=""
  zones=( 1-a 1-b 1-f )
  for z in "${zones[@]}"
  do
    zoneCat=`grep ^$1$ $z | wc -l | tr -s ' ' | cut -d' ' -f2`
    if [ $zoneCat == 1 ]; then
      zone=$z
      break
    fi
  done
}

function getCassandraUsed {
  getZone $1
  usedSpace=`gcloud compute ssh --project "jdi-infrastructure" --zone "us-central$zone" "$1" --command "df -h | grep cassandra | tr -s ' ' | cut -d' ' -f3"`
}

function getMysqlUsed {
  getZone $1
  usedSpace=`gcloud compute ssh --project "jdi-infrastructure" --zone "us-central$zone" "$1" --command "df -h | grep mysql | tr -s ' ' | cut -d' ' -f3"`
}

for i in `seq 1 5`;
do
  server="jdi-accounts$i"
  getCassandraUsed $server
  echo "$server: $usedSpace"
done

for i in `seq 1 4`;
do
  server="jdi-accountsdb$i"
  getMysqlUsed $server
  echo "$server: $usedSpace"
done

for i in `seq 1 3`;
do
  server="jdi-analytics$i"
  getCassandraUsed $server
  echo "$server: $usedSpace"
done

for i in `seq 1 5`;
do
  server="jdi-backupdb$i"
  getMysqlUsed $server  
  echo "$server: $usedSpace"
done

for i in `seq 1 3`;
do
  server="jdi-centraldb$i"
  getMysqlUsed $server
  echo "$server: $usedSpace"
done

for i in `seq 1 84`;
do
  server="jdi-datacass$i"
  getCassandraUsed $server
  echo "$server: $usedSpace"
done

for i in `seq 1 9`;
do
  server="jdi-dataloc$i"
  getCassandraUsed $server
  echo "$server: $usedSpace"
done

for i in `seq 1 2`;
do
  server="jdi-filestoredb$i"
  getMysqlUsed $server
  echo "$server: $usedSpace"
done

for i in `seq 1 2`;
do
  server="jdi-leadsdb$i"
  getMysqlUsed $server
  echo "$server: $usedSpace"
done

for i in `seq 1 2`;
do
  server="jdi-marketingdb$i"
  getMysqlUsed $server
  echo "$server: $usedSpace"
done

for i in `seq 1 3`;
do
  server="jdi-metrics$i"
  getCassandraUsed $server
  echo "$server: $usedSpace"
done

for i in `seq 1 2`;
do
  server="jdi-ordersdb$i"
  getMysqlUsed $server
  echo "$server: $usedSpace"
done

for i in `seq 1 3`;
do
  server="jdi-resources$i"
  getCassandraUsed $server
  echo "$server: $usedSpace"
done

for i in `seq 1 3`;
do
  server="jdi-sesha$i"
  getCassandraUsed $server
  echo "$server: $usedSpace"
done

for i in `seq 1 3`;
do
  server="jdi-tags$i"
  getCassandraUsed $server
  echo "$server: $usedSpace"
done

for i in `seq 1 3`;
do
  server="jdi-tiny$i"
  getCassandraUsed $server
  echo "$server: $usedSpace"
done

for i in `seq 1 2`;
do
  server="jdi-trashdb$i"
  getMysqlUsed $server
  echo "$server: $usedSpace"
done

for i in `seq 1 2`;
do
  server="jdi-ubersmithdb$i"
  getMysqlUsed $server
  echo "$server: $usedSpace"
done

for i in `seq 1 40`;
do
  server="jdi-versions$i"
  getCassandraUsed $server
  echo "$server: $usedSpace"
done
