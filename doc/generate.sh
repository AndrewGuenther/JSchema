#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

rhino -f $DIR/../schema.js -f $1 -f $DIR/docgen.js > ${1%.*}.html
