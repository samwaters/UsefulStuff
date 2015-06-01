description "Launch opensim server"
author "Sam"
start on runlevel [2345]
chdir /root/opensim-0.8.0.3/bin
pre-start script
	echo "Starting opensim as `whoami` at `date` in `pwd`..." >> /var/log/opensim.log
end script
script
	exec /root/opensim-0.8.0.3/bin/opensim-ode.sh 
end script
