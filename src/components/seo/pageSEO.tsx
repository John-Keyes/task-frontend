import { NextSeo } from 'next-seo'

const PageSEO = ({title, description, thumbnail} : {title?: string, description?: string, thumbnail?: string}) => {
	return (
		<NextSeo
			title={title ? `${title} | Nooro` : undefined}
			description={description}
			openGraph={{
				title,
				description,
				images: thumbnail ? [
					{
						url: thumbnail,
						alt: "Thumbnail",
					},
				] : undefined,
			}}
		/>
	)
}

export default PageSEO;