:: Prerequisites
:: - node
:: - git
:: - add %appdata%\npm in environment path
:: - add C:\Program Files\Git\cmd in environment path


attrib -r -s ".\config.js"
xcopy "..\forms\config.js" ".\" /Y

call npm install
call npm install -g gulp
call npm install gulp
call npm install gulp-replace
call jspm install