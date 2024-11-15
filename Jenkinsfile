pipeline {
    agent {
        docker {
            image 'node:18'
            reuseNode true
            args '--network=host'
        }
    }

    stages {
        stage('Check Environment') {
            steps {
                // Check Node.js and npm versions
                sh 'node --version'
                sh 'npm --version'
            }
        }

        stage('Install Dependencies') {
            steps {
                // Install dependencies for the Express server
                sh '''
                    cd server 
                    npm install --verbose
                '''
                // Install dependencies for the React client
                sh '''
                    cd client
                    npm install --verbose
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
                    export PORT=3001
                    npm start
                '''
            }
        }
    }
}
