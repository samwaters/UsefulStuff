if [ "$#" -lt 1 ]; then
    $nodeMem=8192
else
    nodeMem=$1
fi
if [ ! -z $2 ]; then
    target=$2
else
    target="development"
fi
if [ ! -z $3 ]; then
    env=$3
else
    env="dev"
fi
node --max-old-space=$nodeMem ./node_modules/@angular/cli/bin/ng build --target=$target --env=$env
