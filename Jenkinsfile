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

        stage('Start Servers') {
            steps {
                // Start both servers in the background
                sh '''
                    # Start Express server in the background
                    cd server
                    nohup npm start &

                    # Start React server on port 3001 in the background
                    cd ../client
                    export PORT=3001
                    nohup npm start &
                '''
            }
        }
    }

    post {
        always {
            // Cleanup background processes after the pipeline finishes
            sh '''
                pkill -f "npm start" || true
            '''
        }
    }
}
