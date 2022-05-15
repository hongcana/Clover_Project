package com.clover.clover

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class CloverApplication

fun main(args: Array<String>) {
	runApplication<CloverApplication>(*args)
}
