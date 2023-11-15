#!/usr/bin/bash

CSVDATA=data/kosen_school_emblem.csv

while read LINE
do
  id=$(echo $LINE | cut -d , -f 1)
  name_ja=$(echo $LINE | cut -d , -f 2)
  initial_of_origin_emblem_text=$(echo $LINE | awk -F 'jpg' '{print $2}' | cut -d , -f 2 | cut -c 2-7) # 2-7は適当に決めた文字数
  origin_emblem_url=$(echo $LINE | awk -F 'jpg' '{print $2}' | cut -d , -f 3)

  if [ "$name_ja" = "name_ja" ] ; then # ヘッダー行のスキップ
    continue
  else
    curl -s ${origin_emblem_url} | grep ${initial_of_origin_emblem_text} > /dev/null
    if [ $? -eq 0 ] ; then # curl / grepの結果で処理を分岐
      echo "${id}-${name_ja}: OK"
    else
      echo "${id}-${name_ja}: Check Please..."
    fi
  fi

done < $CSVDATA
