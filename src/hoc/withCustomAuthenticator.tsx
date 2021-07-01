import React, {
	ComponentType,
	ComponentPropsWithRef,
	FunctionComponent,
} from 'react';
import { Auth, appendToCognitoUserAgent } from '@aws-amplify/auth';
import { AmplifyContainer, AmplifyAuthenticator, AmplifyAuthContainer, AmplifySignIn, AmplifySignUp  } from '@aws-amplify/ui-react';
import { onAuthUIStateChange, AuthState } from '@aws-amplify/ui-components';
import { Logger } from '@aws-amplify/core';
import { vocabularies } from '../const/vocabularies';
import { I18n } from 'aws-amplify';

const logger = new Logger('withAuthenticator');

I18n.putVocabularies(vocabularies);
I18n.setLanguage('ja');

export function withCustomAuthenticator<T extends object>(
	Component: ComponentType<T>,
	authenticatorProps?: ComponentPropsWithRef<typeof AmplifyAuthenticator>
) {
	const AppWithAuthenticator: FunctionComponent<T> = props => {
		const [signedIn, setSignedIn] = React.useState(false);

		React.useEffect(() => {
			appendToCognitoUserAgent('withAuthenticator');
			
			// checkUser returns an "unsubscribe" function to stop side-effects
			return checkUser();
		}, []);

		function checkUser() {
			setUser();
			
			return onAuthUIStateChange(authState => {
				if (authState === AuthState.SignedIn) {
					setSignedIn(true);
				} else if (authState === AuthState.SignedOut) {
					setSignedIn(false);
				}
			});
		}

		async function setUser() {
			try {
				const user = await Auth.currentAuthenticatedUser();
				if (user) setSignedIn(true);
			} catch (err) {
				logger.debug(err);
			}
		};

		if (!signedIn) {
			return (
				<AmplifyContainer>
					<AmplifyAuthContainer>
						<AmplifyAuthenticator { ...authenticatorProps} {...props} >
                            <AmplifySignUp slot="sign-up" formFields={[ { type: "email" }, { type: "password" } ]}/>
                            <AmplifySignIn slot="sign-in" usernameAlias="email" hideSignUp={true}/>
                        </AmplifyAuthenticator>
					</AmplifyAuthContainer>
				</AmplifyContainer>
			);
		}

		return <Component {...props} />;
	};

	return AppWithAuthenticator;
}
