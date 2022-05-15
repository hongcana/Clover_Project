package com.clover.clover.controller

import com.clover.clover.repository.StockItem
import com.clover.clover.repository.StockItemRepository
import com.clover.clover.service.StockItemService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import javax.servlet.http.HttpServletRequest

@RestController
class StockItemController(
    @Autowired val stockItemService: StockItemService,
    val request: HttpServletRequest) {

    @GetMapping("listAll")
    fun getStockItems() = stockItemService.getStockItems()

    @GetMapping("search")
    fun searchStockItems( @RequestParam("keyword") keyword: String ): List<StockItem> {
        return stockItemService.searchStockItems(keyword)
    }
}