default:
	php -S localhost:8000 -t public


# doctrine
model:
	vendor/bin/doctrine-module orm:convert-mapping  --namespace='Application\Entity\' --force --from-database annotation ./module/Application/src/   
	vendor/bin/doctrine-module orm:generate-entities ./module/Application/src/ --generate-annotations=true