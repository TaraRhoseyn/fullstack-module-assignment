pipeline {
    agent any

    stages {
        stage('Start docker') {
            agent {
                docker {
                    image 'node:18'
                    reuseNode true
                }
            }
            steps {
                // Check Node and npm have installed correctly
                sh 'node --version'
                sh 'npm --version'
            }
        }

        stage('Install dependencies') {
            steps {
                // Install express
                sh '''
                    cd server
                    npm install
                '''
                // Install react
                sh '''
                    cd client
                    npm install
                '''
            }
        }

        stage('Start Express server') {
            steps {
                sh '''
                    cd server
                    npm start
                '''
            }
        }

        stage('Start React server') {
            steps {
                sh '''
                    cd client
                    npm start
                '''
            }
        }
    }
}
