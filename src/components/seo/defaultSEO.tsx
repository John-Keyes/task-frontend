import { useRouter } from 'next/router';
import { DefaultSeo, LogoJsonLd } from 'next-seo';
import getConfig from 'next/config';

const {publicRuntimeConfig: {clientUrl}} = getConfig();

const DEFAULT_TITLE = "NOORO";
const DEFAULT_DESCRIPTION = "Nooro test desc.";

const DefaultSEO = () => {
	const router = useRouter();
  	return (
    	<>
			<DefaultSeo
				defaultTitle={DEFAULT_TITLE}
				description={DEFAULT_DESCRIPTION}
				canonical={clientUrl}
				openGraph={{
					title: DEFAULT_TITLE,
					description: DEFAULT_DESCRIPTION,
					url: clientUrl + router.asPath,
					type: "website",
					locale: "en_US",
					siteName: "Nooro"
				}}
				twitter={{
					cardType: "summary_large_image"
				}}
				additionalLinkTags={[
					{
						rel: "shortcut icon",
						href: `${clientUrl}/images/meta/favicon.ico`,
						type: "image/x-icon"
					},
					{
						rel: "icon",
						type: "image/png",
						sizes: "16x16",
						href: `${clientUrl}/images/meta/favicon-16x16.png`,
					},
					{
						rel: "icon",
						type: "image/png",
						sizes: "32x32",
						href: `${clientUrl}/images/meta/favicon-32x32.png`,
					},
					{
						rel: "apple-touch-icon",
						type: "image/png",
						sizes: "180x180",
						href: `${clientUrl}/images/meta/apple-touch-icon.png`,
					},
					{
						rel: "manifest",
						href: `${clientUrl}/site.webmanifest`,
					}
				]}
				additionalMetaTags={[
					{
						httpEquiv: "x-ua-compatible",
						content: "IE=edge"
					},
					{
						name: "viewport",
						content: "width=device-width, initial-scale=1.0"
					},
					{
						name: "keywords",
						content: "nooro, test"
					},
					{
						name: "author",
						content: "John Keyes"
					}
				]}
			/>

			<LogoJsonLd
				logo={`${clientUrl}/images/logo.png`}
				url={clientUrl as string}
			/>
    	</>
  	)
}

export default DefaultSEO;
