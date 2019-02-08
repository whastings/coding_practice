provider "aws" {
  access_key = "${var.aws_access_key}"
  secret_key = "${var.aws_secret_key}"
  region = "${var.region}"
}

resource "aws_security_group" "default" {
  name = "terraform_practice"

  # Allow pings
  ingress {
    protocol = "icmp"
    from_port = 8
    to_port = 0
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Allow SSH
  ingress {
    protocol = "tcp"
    from_port = 22
    to_port = 22
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_key_pair" "ssh_auth" {
  key_name = "key_for_terraform_practice"
  public_key = "${file(var.ssh_public_key_path)}"
}

resource "aws_instance" "example" {
  ami = "${lookup(var.amis, var.region)}"
  instance_type = "t2.micro"
  vpc_security_group_ids = ["${aws_security_group.default.id}"]
  key_name = "${aws_key_pair.ssh_auth.id}"

  provisioner "local-exec" {
    command = "echo ${aws_instance.example.public_ip} > ip_address.txt"
  }
}

output "host" {
  value = "${aws_instance.example.public_dns}"
}
