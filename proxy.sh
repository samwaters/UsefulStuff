#!/bin/bash
#Variable definition
#Interface is the network interface to use
#Local IP is the machine's local (lan) IP
#Destination IP is the final destination
INTERFACE="eth0"
LOCAL_IP="192.168.0.10"
DESTINATION_IP="216.58.210.35"
PORT=80
#Enable IP forwarding
sysctl -w net.ipv4.ip_forward=1
#Enable Masquerade routing
iptables -t nat -A POSTROUTING -o $INTERFACE -j MASQUERADE
#Allow forwarding
iptables -A FORWARD -i $INTERFACE -p tcp --dport $PORT -d $DESTINATION_IP -j ACCEPT
#Outgoing routing
iptables -t nat -A PREROUTING -p tcp --dport $PORT -j DNAT --to-destination $DESTINATION_IP:$PORT
#Incoming routing
iptables -t nat -A POSTROUTING -p tcp -d $DESTINATION_IP --dport $PORT -j SNAT --to-source $LOCAL_IP
