resource "aws_instance" "public_ec2_01" {
  ami               = var.ami
  availability_zone = var.az
  instance_type     = var.inst_type
  ebs_block_device {
    device_name = "/dev/sda1"
    volume_size = 8
    volume_type = "gp3"
  }
  key_name                    = "shh_key"
  subnet_id                   = var.subnet_id
  associate_public_ip_address = true
  vpc_security_group_ids      = [var.sg_id]
  tags = {
    Name = "public_ec2_01"
  }
  user_data = <<-EOF
  #!/bin/bash

    # Atualizar pacotes
    sudo apt-get update

    # Instalar Node.js e npm
    sudo apt-get install -y nodejs npm

    # Clonar o repositório
    git clone https://github.com/Food-Way/Web.git /home/ubuntu/Web

    # Adicionar o usuário 'ubuntu' ao grupo sudo
    sudo usermod -aG sudo ubuntu

    # Ajustar permissões
    sudo chown -R ubuntu:ubuntu /var/www

    # Navegar até o diretório do repositório clonado
    cd /home/ubuntu/Web

    # Instalar dependências
    sudo npm install --force

    # apagar dist anterior 
    sudo rm -r var/www/dist

    # Executar build
    sudo npm run build

    # Copiar o diretório 'dist' para a pasta específica
    sudo cp -r dist /var/www

    # Restartando nginx
    sudo systemctl restart nginx  
  EOF
}

resource "aws_instance" "public_ec2_02" {
  ami               = var.ami
  availability_zone = var.az
  instance_type     = var.inst_type
  ebs_block_device {
    device_name = "/dev/sda1"
    volume_size = 8
    volume_type = "gp3"
  }
  key_name                    = "shh_key"
  subnet_id                   = var.subnet_id
  associate_public_ip_address = true
  vpc_security_group_ids      = [var.sg_id]
  tags = {
    Name = "public_ec2_02"
  }
  user_data = <<-EOF
    #!/bin/bash

    # Atualizar pacotes
    sudo apt-get update

    # Instalar Node.js e npm
    sudo apt-get install -y nodejs npm

    # Clonar o repositório
    git clone https://github.com/Food-Way/Web.git /home/ubuntu/Web

    # Adicionar o usuário 'ubuntu' ao grupo sudo
    sudo usermod -aG sudo ubuntu

    # Ajustar permissões
    sudo chown -R ubuntu:ubuntu /var/www

    # Navegar até o diretório do repositório clonado
    cd /home/ubuntu/Web

    # Instalar dependências
    sudo npm install --force

    # apagar dist anterior 
    sudo rm -r var/www/dist

    # Executar build
    sudo npm run build

    # Copiar o diretório 'dist' para a pasta específica
    sudo cp -r dist /var/www

    # Restartando nginx
    sudo systemctl restart nginx  
  EOF
}

resource "aws_eip_association" "eip_assoc_01" {
  instance_id   = aws_instance.public_ec2_01.id
  allocation_id = "eipalloc-06b74cfd3c8ec27d1" 
}

resource "aws_eip_association" "eip_assoc_02" {
  instance_id   = aws_instance.public_ec2_02.id
  allocation_id = "eipalloc-0c747d40a67e26a0f" 
}