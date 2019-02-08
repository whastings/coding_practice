variable "aws_access_key" {}
variable "aws_secret_key" {}
variable "region" {
  default = "us-west-1"
}
variable "amis" {
  type = "map"
  default = {
    "us-east-1" = "ami-b374d5a5"
    "us-west-1" = "ami-693d4009"
  }
}
