resource "aws_dynamodb_table" "url_table" {
  name         = "url-shortener-table"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "code"

  attribute {
    name = "code"
    type = "S"
  }

  tags = {
    Project = "URL-Shortener"
    Owner   = "Hieu"
    Env     = "Dev"
  }
}