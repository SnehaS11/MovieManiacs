pipeline {
    agent any
        stages {
            stage('One') {
                steps {
                    echo 'Hi, this is Sneha from Fidelity'
                }
            }
            stage('Two') {
                steps {
                    input('Do you want to proceed?')
                }
            }
            stage('Three') {
                when {
                    not {
                        branch "master"
                    }
                }
                steps {
                    echo "This is not branch master"
                }
            }
            stage('Four') {
                parallel {
                    stage('Unit Test') {
                        steps {
                            echo "Running unit tests..."
                        }
                    }
                    stage('Integration Test') {
                        agent{
                            docker {
                                reuseNode false
                                image 'ubuntu'
                            }
                        }
                        steps {
                            echo 'Running the integration test...'
                        }
                    }
                }
            }
        }
}