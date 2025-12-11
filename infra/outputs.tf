output "api_endpoint" {
  value = aws_apigatewayv2_api.http_api.api_endpoint
}

output "dynamodb_table" {
  value = aws_dynamodb_table.url_table.name
}

output "lambda_shorten_fn_name" {
  value = aws_lambda_function.shorten.function_name
}

output "lambda_redirect_fn_name" {
  value = aws_lambda_function.redirect.function_name
}