#!/bin/bash  

aws s3 sync src/ s3://lab.igniterbee.com --region ap-south-1 --delete
aws cloudfront create-invalidation --distribution-id E2KRBDFE2FFI8P --paths /*

cd ./lambda/RegistrationParent
rm ../../dist/RegistrationParent.zip
zip ../../dist/RegistrationParent.zip index.js
aws lambda update-function-code --function-name "RegistrationParent" --zip-file "fileb://../../dist/RegistrationParent.zip"
cd ../..

cd ./lambda/RegistrationChild
rm ../../dist/RegistrationChild.zip
zip ../../dist/RegistrationChild.zip index.js
aws lambda update-function-code --function-name "RegistrationChild" --zip-file "fileb://../../dist/RegistrationChild.zip"
cd ../..

cd ./lambda/SmsBankDetails
rm ../../dist/SmsBankDetails.zip
zip ../../dist/SmsBankDetails.zip index.js
aws lambda update-function-code --function-name "SmsBankDetails" --zip-file "fileb://../../dist/SmsBankDetails.zip"
cd ../..


git commit -am "deployed to AWS"
git push