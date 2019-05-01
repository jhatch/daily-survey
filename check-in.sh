set -e
rm -rf node_modules
npm i
npm run lint
npm test
rm -rf bundle_*.zip
zip -r "bundle_$(date +%s).zip" *
git add .
git commit -m "$1"
git push
