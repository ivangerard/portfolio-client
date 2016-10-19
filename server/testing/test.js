'use strict'
var chai = require('chai'),
    expect = chai.expect,
    chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;
var mongoose = require('mongoose');
var should = chai.should();
describe('Stockoverflow', function() {
    it('should list ALL Stock on /api/items GET', function(done) {
        chai.request('http://localhost:8080')
            .get('/api/items')
            .end(function(err, res) {
                res.should.have.status(200);
                done();
            });
    });

    it('should add a New Stock /api/stock POST', function(done) {
        chai.request('http://localhost:8080')
            .post('/api/items')
            .send({
                "item_code": "001",
                "name": "Aqua",
                "description": "Buat Minum",
                "price": 2000,
                "stock":1
            })
            .end(function(err, res) {
                chai.request('http://localhost:8080')
                    .get('/api/items')
                    .end(function(err, res) {
                        res.should.have.status(200);
                        res.should.be.json;
                        //console.log(res.body);
                        res.body[0].should.have.property('item_code');
                        res.body[0].should.have.property('name');
                        res.body[0].should.have.property('description');
                        res.body[0].should.have.property('price');
                        res.body[0].should.have.property('stock');
                        res.body[0].item_code.should.equal("001");
                        res.body[0].name.should.equal("Aqua");
                        res.body[0].description.should.equal("Buat Minum");
                        res.body[0].price.should.equal(2000);
                        res.body[0].stock.should.equal(1);
                        done()
                    })
            });
    });
    it('should an Update Stock /api/stock PUT', function(done) {
        chai.request('http://localhost:8080')
            .get('/api/items')
            .end(function(err, res) {
                console.log(res.body[0].id);
                // console.log(res);
                chai.request('http://localhost:8080')
                    .put('/api/items/'+res.body[0]._id)
                    .send({
                      "item_code": "003",
                      "name": "Aquas",
                      "description": "Buat Minums",
                      "price": 3000,
                      "stock":2
                    })
                    .end(function(err, res) {

                        chai.request('http://localhost:8080')
                            .get('/api/items')
                            .end(function(err, res) {
                              res.should.have.status(200);
                              res.should.be.json;
                              //console.log(res.body);
                              res.body[0].should.have.property('item_code');
                              res.body[0].should.have.property('name');
                              res.body[0].should.have.property('description');
                              res.body[0].should.have.property('price');
                              res.body[0].should.have.property('stock');
                              res.body[0].item_code.should.equal("003");
                              res.body[0].name.should.equal("Aquas");
                              res.body[0].description.should.equal("Buat Minums");
                              res.body[0].price.should.equal(3000);
                              res.body[0].stock.should.equal(2);
                                done()
                            })
                    })
            });
    });
    it('should delete a SINGLE Stock on /api/stock/<id> DELETE', function(done) {
        chai.request('http://localhost:8080')
            .get('/api/items')
            .end(function(err, res) {
                chai.request('http://localhost:8080')
                    .delete('/api/items/' + res.body[0]._id)
                    .end(function(err, res) {
                        chai.request('http://localhost:8080')
                            .get('/api/items')
                            .end(function(err, res) {
                                res.should.have.status(200);
                                res.should.be.json;
                                expect(res.body).to.have.length(0);
                                //console.log(res.body).to.have.length(0);
                                done()
                            })
                    });
            });
    });
    //  it('should delete a SINGLE blob on /blob/<id> DELETE', function(done) {});
});;
