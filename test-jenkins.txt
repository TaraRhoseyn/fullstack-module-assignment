pipeline {
    agent any

    stages {
        stage('w/out docker') {
            steps {
                sh '''
                    echo "without docker"
                    ls -la
                '''
            }
        }
        stage('w docker') {
            agent {
                docker {
                    image 'node:18'
                    reuseNode true
                }
            }
            steps {
                sh '''
                    echo "with docker"
                    ls -la
                '''
                sh 'npm --version'
            }
        }
    }
}
