package net.yogstation.yogbot.http

import org.springframework.context.annotation.Configuration
import org.thymeleaf.TemplateEngine
import org.thymeleaf.templatemode.TemplateMode
import org.thymeleaf.templateresolver.UrlTemplateResolver


@Configuration
open class TemplateResolverConfig() {
	private val templateResolver = UrlTemplateResolver()
	private val templateEngine = TemplateEngine()

	init {
		templateResolver.templateMode = TemplateMode.HTML
		templateResolver.prefix = "/WEB-INF/templates/"
		templateResolver.suffix = ".html"
		templateResolver.isCacheable = false

		templateEngine.setTemplateResolver(templateResolver)
	}
}
