#!/bin/bash  
ng build
aws s3 sync dist/ s3://lab.igniterbee.com --region ap-south-1 --delete
aws cloudfront create-invalidation --distribution-id E2KRBDFE2FFI8P --paths /*
git commit -am "deployed to AWS"
git push