resource "aws_lambda_function" "shorten" {
  function_name    = "create-shorten-url"
  role             = aws_iam_role.lambda_role.arn
  handler          = "shorten.handler"
  runtime          = "nodejs20.x"
  filename         = "${path.root}/../dist/shorten.zip"
  source_code_hash = filebase64sha256("${path.root}/../dist/shorten.zip")

  environment {
    variables = {
      TABLE_NAME = aws_dynamodb_table.url_table.name
      BASE_URL   = aws_apigatewayv2_api.http_api.api_endpoint
    }
  }
}

resource "aws_lambda_function" "redirect" {
  function_name    = "url-shortener-redirect"
  role             = aws_iam_role.lambda_role.arn
  handler          = "redirect.handler"
  runtime          = "nodejs20.x"
  filename         = "${path.root}/../dist/redirect.zip"
  source_code_hash = filebase64sha256("${path.root}/../dist/redirect.zip")

  environment {
    variables = {
      TABLE_NAME = aws_dynamodb_table.url_table.name
    }
  }
}

resource "aws_lambda_permission" "api_gateway_shorten" {
  statement_id  = "AllowApiGatewayInvokeShortenLambda"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.shorten.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.http_api.execution_arn}/*"
}

resource "aws_lambda_permission" "api_gateway_redirect" {
  statement_id  = "AllowApiGatewayInvokeRedirectLambda"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.redirect.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.http_api.execution_arn}/*"
}