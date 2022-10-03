#!/bin/bash

HERE=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd)
ROOT=$(dirname ${HERE})

# Find tutorial files and move them into site data
for tutorial in $(find $ROOT/tutorials -name tutorial.yaml)
  do
  directory=$(dirname ${tutorial})
  directory=$(basename ${directory})
  dest="${ROOT}/docs/_data/tutorials/${directory}"
  mkdir -p ${dest}
  echo "Copying ${tutorial} into data $dest"
  cp ${tutorial} $dest/
done
