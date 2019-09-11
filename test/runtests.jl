using PkgOptions
using PkgOptionsDemo
using Test

@testset "PkgOptions.jl" begin
    @test PkgOptionsDemo.pkgoptions isa Dict
end
