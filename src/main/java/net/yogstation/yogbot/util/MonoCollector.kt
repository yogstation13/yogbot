package net.yogstation.yogbot.util

import reactor.core.publisher.Mono
import java.util.function.BiConsumer
import java.util.function.BinaryOperator
import java.util.function.Function
import java.util.function.Supplier
import java.util.stream.Collector

class MonoCollector : Collector<Mono<*>, MutableList<Mono<*>>, Mono<*>> {
	override fun supplier(): Supplier<MutableList<Mono<*>>> {
		return Supplier { ArrayList() }
	}

	override fun accumulator(): BiConsumer<MutableList<Mono<*>>, Mono<*>> {
		return BiConsumer { obj: MutableList<Mono<*>>, e: Mono<*> -> obj.add(e) }
	}

	override fun combiner(): BinaryOperator<MutableList<Mono<*>>> {
		return BinaryOperator { list1: MutableList<Mono<*>>, list2: List<Mono<*>> ->
			list1.addAll(
				list2
			)
			list1
		}
	}

	override fun finisher(): Function<MutableList<Mono<*>>, Mono<*>> {
		return Function { list: List<Mono<*>> ->
			var result: Mono<*> = Mono.empty<Any>()
			for (mono in list) {
				result = result.and(mono)
			}
			result
		}
	}

	override fun characteristics(): Set<Collector.Characteristics> {
		return setOf(Collector.Characteristics.UNORDERED)
	}

	companion object {
		fun toMono(): MonoCollector {
			return MonoCollector()
		}
	}
}
