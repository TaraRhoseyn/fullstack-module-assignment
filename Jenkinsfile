pipeline {
    agent {
        docker {
            image 'node:18'
            reuseNode true
        }
    }

    stages {
        stage('Check Environment') {
            steps {
                // Check Node and npm versions
                sh 'node --version'
                sh 'npm --version'
            }
        }

        stage('Install Dependencies') {
            steps {
                // Install dependencies for the Express server
                sh '''
                    cd server
                    npm install
                '''
                // Install dependencies for the React client
                sh '''
                    cd client
                    npm install
                '''
            }
        }

        stage('Start Express Server') {
            steps {
                // Start the Express server
                sh '''
                    cd server
                    nohup npm start &
                '''
            }
        }

        stage('Start React Server') {
            steps {
                // Start the React server
                sh '''
                    cd client
                    npm start
                '''
            }
        }
    }
}
