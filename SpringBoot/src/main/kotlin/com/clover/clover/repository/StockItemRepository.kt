package com.clover.clover.repository

import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.CrudRepository
import org.springframework.data.repository.query.Param

interface StockItemRepository: CrudRepository<StockItem, String>{
        @Query(value =
            "select * " +
                    "from stockitems " +
                    "where name like %:keyword% or code like %:keyword%", nativeQuery = true)
        fun findByStockItem(@Param("keyword") keyword: String): List<StockItem>

}