pipeline {
    agent any
    stages {
        stage('Build da imagem Docker') {
            steps {
                script {
                    docker.build('devops/app:latest')
                    echo "Building..."
                }
            }
        }
        stage('Subir docker compose - redis e app') {
            steps {
                script {
                    dockerComposeUp()
                    echo "Redis, app e compose subindo..."
                }
            }
        }
        stage('Sleep para subida de containers') {
            steps {
                sleep(time: 10, unit: 'SECONDS')
                echo "Sleeping..."
            }
        }
        stage('Teste do sistema') {
            steps {
                script {
                    bat 'teste-app.bat'
                    echo "Testing..."
                }
            }
        }
    }
}

def dockerComposeUp() {
    script {
        echo "Running: docker-compose up -d"
        bat 'docker-compose up -d'
    }
}