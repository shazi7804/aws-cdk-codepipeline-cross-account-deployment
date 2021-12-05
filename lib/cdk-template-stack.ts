import * as cdk from '@aws-cdk/core';

export class CdkTemplateStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const codecommitRepository = new codecommit.Repository(this, "SourceRepo", {
      repositoryName: props.codecommit_repo
    });

    const codebuildProject = new codebuild.PipelineProject(this, "Build", {
      projectName: props.codebuild_project,
      environment: {
        computeType: codebuild.ComputeType.SMALL,
        buildImage: codebuild.LinuxBuildImage.AMAZON_LINUX_2_3,
        privileged: true,
        environmentVariables: {
          AWS_ACCOUNT_ID: {
            type: codebuild.BuildEnvironmentVariableType.PLAINTEXT,
            value: cdk.Aws.ACCOUNT_ID
          },
          AWS_DEFAULT_REGION: {
            type: codebuild.BuildEnvironmentVariableType.PLAINTEXT,
            value: cdk.Aws.REGION
          }
        }
      }
    });

    const codeBuildPolicyOfcodeCommit = new iam.PolicyStatement();
    codeBuildPolicyOfcodeCommit.addResources(codecommitRepository.repositoryArn)
    codeBuildPolicyOfcodeCommit.addActions(
      "codecommit:ListBranches",
      "codecommit:ListRepositories",
      "codecommit:BatchGetRepositories",
      "codecommit:GitPull"
    );
    codebuildProject.addToRolePolicy(
      codeBuildPolicyOfcodeCommit,
    );


  }
}
