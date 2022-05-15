package com.clover.clover.service

import com.clover.clover.repository.StockItem
import com.clover.clover.repository.StockItemRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Service

@Service
class StockItemService(private val stockItemRepository: StockItemRepository) {
    fun getStockItems() = stockItemRepository.findAll()

    fun searchStockItems(keyword: String): List<StockItem> {
        return stockItemRepository.findByStockItem(keyword)
    }
}