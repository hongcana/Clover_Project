package com.clover.clover.repository

import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.Id
import javax.persistence.Table

@Entity
@Table(name="stockitems")
class StockItem {
    @Id
    @Column(name="code")
    var code: String=""

    @Column(name="name")
    var name: String=""
}